import React from "react";
import "./Navigation.css";
import Button from "../../../Button/Button";

export default function Navigation({ navList }) {
  return (
    <nav>
      <ul className="nav-list">
        {navList.map(({ id, divider, ...rest }) =>
          divider ? (
            <hr className="divider" />
          ) : (
            <li key={id}>
              <Button {...rest} />
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
