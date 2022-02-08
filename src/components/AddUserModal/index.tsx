import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';

import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import Input from 'components/Input';
import Calendar from 'components/Calendar';

import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import { Gender, UserDTO } from 'types';
import validator from 'validator';
import PhoneNumber from 'components/PhoneNumber';
import DocumentType from 'components/DocumentType';
import api from 'services/api';
import { handleError } from 'utils/handle-errors';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import HeadquarterList from 'components/HeadquarterList';

import * as S from './styles';

import 'react-phone-input-2/lib/style.css';

type AddUserModalProps = {
  title: string;
  userRole: number;
  actions: (close: boolean, update: boolean) => void;
};

type SignupCodeResponse = {
  email: string;
  isConfirmed: boolean;
};

const AddUserModal = ({ title, userRole, actions }: AddUserModalProps): JSX.Element => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneWihtError, setPhoneWithError] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setValue('documentType', 0);
    setValue('headquarterId', 0);
  }, [setValue]);

  const { user } = useAuth();

  const genders = [
    { text: 'Femenino', value: 'F' },
    { text: 'Masculino', value: 'M' },
  ] as Gender[];

  const handleClose = (): void => {
    actions(true, false);
  };

  const onSubmit = async (data: UserDTO): Promise<void> => {
    const { username, gender, address, givenName, familyName, documentId, documentType, headquarterId } = data;

    setPhoneWithError(false);
    if (phoneNumber.length === 0) {
      setPhoneWithError(true);
    }

    if (documentType === 0) {
      setError('documentType', {
        type: 'manual',
        message: 'Campo obligatorio',
      });
    } else if (headquarterId === 0) {
      setError('headquarterId', {
        type: 'manual',
        message: 'Campo obligatorio',
      });
    } else {
      try {
        const { data: response }: { data: SignupCodeResponse } = await api({
          url: `user/signup`,
          method: 'POST',
          data: {
            username,
            phoneNumber,
            birthdate: format(birthDate, 'yyyy-MM-dd'),
            gender,
            address,
            givenName,
            familyName,
            documentId,
            documentType: Number(documentType),
            roleId: userRole,
            headquarterId: Number(headquarterId),
            email: username,
            companyId: user.data.company,
          },
        });
        if (!response.isConfirmed) {
          toast.success('Usuario adicionado con éxito, ahora debe confirmar el e-mail');
          actions(true, true);
        }
      } catch (err: any) {
        const { message } = handleError(err);
        toast.error(message);
      }
    }
  };

  return (
    <S.Wrapper>
      {isSubmitting && <Loader />}

      <S.Container>
        <span onClick={handleClose} role="none" className="close-button">
          &times;
        </span>
        <S.Content>
          <S.Title>{title}</S.Title>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.FormRow>
              <Input
                type="name"
                label="givenName"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Nombres"
                required
              />
              <Input
                type="name"
                label="familyName"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Apellidos"
                required
              />
            </S.FormRow>
            <S.FormRow>
              <Calendar
                label="Fecha de nascimiento"
                width="270px"
                onSelectDate={(date: Date) => setBirthDate(date)}
                required
              />
              <RadioButton
                label="gender"
                title="Género"
                options={genders}
                errorMsg="Campo obligatório"
                register={register}
                required
                errors={errors}
              />
            </S.FormRow>
            <S.FormRow>
              <DocumentType register={register} errors={errors} />
              <Input
                type="text"
                label="documentId"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Numéro de documento"
                required
              />
            </S.FormRow>
            <S.FormRow>
              <Input
                type="text"
                label="address"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="Dirección"
                required
              />
              <PhoneNumber
                title="Telefóno"
                onChangeValue={phone => setPhoneNumber(phone)}
                width="270px"
                label="phone_number"
                errorMessage="Campo obligatorio"
                error={phoneWihtError}
                disabled={false}
                value=""
              />
            </S.FormRow>
            <S.FormRow>
              <Input
                type="text"
                label="username"
                register={register}
                errors={errors}
                msgError="Campo obligatorio"
                title="E-mail"
                required
                validation={value => {
                  return validator.isEmail(value) || 'El valor ingresado no parece ser un e-mail';
                }}
              />
              {userRole === 2 && <HeadquarterList register={register} errors={errors} companyId={user.data.company} />}
            </S.FormRow>
            <S.FormRow>
              <S.Buttons>
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={handleClose}>
                  Cancelar
                </Button>
              </S.Buttons>
            </S.FormRow>
          </S.Form>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
};

export default AddUserModal;
