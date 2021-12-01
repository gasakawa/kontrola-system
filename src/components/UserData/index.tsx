import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useForm } from 'react-hook-form';

import { UserProfile } from 'types';

import Input from 'components/Input';
import Loader from 'components/Loader';
import api from 'services/api';
import { toast } from 'react-toastify';
import { handleError } from 'utils/handle-errors';
import * as S from './styles';

type ProfileInfoProps = {
  user: UserProfile;
};

type EditProfileFormData = {
  family_name: string;
  given_name: string;
  address: string;
  phone: string;
};

const UserData = ({ user }: ProfileInfoProps): JSX.Element => {
  const [enabled, setEnabled] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    const { givenName, familyName, phoneNumber, address } = user;
    setValue('given_name', givenName);
    setValue('family_name', familyName);
    setValue('address', address);
    setValue('phone', phoneNumber);
  }, [setValue, user]);

  const onSubmit = async (data: EditProfileFormData): Promise<void> => {
    const { family_name, given_name, address, phone } = data;
    try {
      setEnabled(false);
      if (
        family_name !== user.familyName ||
        given_name !== user.givenName ||
        address !== user.address ||
        phone !== user.phoneNumber
      ) {
        const response = await api({
          url: `/user/updated/${user.id}`,
          method: 'PUT',
          data: {
            address,
            phoneNumber: phone,
            givenName: given_name,
            familyName: family_name,
          },
        });
        const { isUpdated, message } = response.data;
        if (isUpdated) {
          toast.success(message);
        }
      }
    } catch (err: any) {
      const { message } = handleError(err);

      toast.error(message);
    }
  };

  return (
    <S.Wrapper>
      {isSubmitting && <Loader />}
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.ButtonsContainer>
          <Button
            onClick={() => {
              setEnabled(true);
            }}
            disabled={enabled}
          >
            Editar
          </Button>

          <Button disabled={!enabled} type="submit">
            Salvar
          </Button>
        </S.ButtonsContainer>
        <S.FormRow>
          <Input
            type="text"
            label="email"
            defaultValue={user.email}
            register={register}
            placeholder="E-mail"
            errors={errors}
            msgError="Campo obligatorio"
            disabled
            title="E-mail"
          />
          <Input
            type="text"
            label="given_name"
            register={register}
            placeholder="Nombres"
            required
            errors={errors}
            msgError="Campo obligatorio"
            disabled={!enabled}
            title="Nombres"
          />
          <Input
            type="text"
            label="family_name"
            register={register}
            placeholder="Apellidos"
            required
            errors={errors}
            msgError="Campo obligatorio"
            disabled={!enabled}
            title="Apellidos"
          />
          <Input
            type="text"
            label="phone"
            register={register}
            placeholder="Teléfono"
            required
            errors={errors}
            msgError="Campo obligatorio"
            disabled={!enabled}
            title="Teléfono"
          />
        </S.FormRow>
        <S.FormRow>
          <Input
            type="text"
            label="address"
            register={register}
            placeholder="Dirección"
            required
            errors={errors}
            msgError="Campo obligatorio"
            disabled={!enabled}
            title="Dirección"
            width="xl"
          />
        </S.FormRow>
      </S.FormContainer>
    </S.Wrapper>
  );
};

export default UserData;
