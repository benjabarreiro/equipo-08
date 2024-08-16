import React, { useContext } from "react";
import FormGroup from "../FormComponents/FormGroup";
import Input from "../FormComponents/Input";
import BookingContext from "../../contexts/BookingContext";

export default function PersonalDataForm() {
  const { userData, handleUserData } = useContext(BookingContext);

  return (
    <article>
      <h2>
        <span>Completá tus datos</span>
      </h2>
      <form className="form">
        <FormGroup>
          <Input
            label="Nombre"
            id="nombre"
            handler={handleUserData}
            value={userData.firstName}
            name="firstName"
          />
          <Input
            label="Apellido"
            id="apellido"
            handler={handleUserData}
            value={userData.lastName}
            name="lastName"
          />
        </FormGroup>
        <FormGroup>
          <Input
            label="Correo electrónico"
            id="email"
            handler={handleUserData}
            value={userData.email}
            name="email"
          />
        </FormGroup>
      </form>
    </article>
  );
}
