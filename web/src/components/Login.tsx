//
//  Login.tsx
//  web
//
//  Created by d-exclaimation on 21:43.
//

import Button from "@atlaskit/button";
import Form, {
  Field,
  FormFooter,
  HelperMessage,
  OnSubmitHandler,
} from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import Flex from "./utils/Flex";

type FormFieldData = {
  label: string;
  placeholder: string;
  footer?: string;
};

const Login: React.FC = () => {
  const fields: Record<string, FormFieldData> = useMemo(
    () => ({
      name: {
        label: "Name",
        placeholder: "Enter your name",
        footer: "Use the name you register in",
      },
      password: {
        label: "Password",
        placeholder: "Enter the password",
      },
    }),
    []
  );

  const onSubmit: OnSubmitHandler<Record<string, string>> = useCallback(
    (state, api) => {
      Object.keys(state).forEach((key) => api.change(key, ""));
      console.table(state);
    },
    []
  );

  return (
    <Flex dir="column">
      <Form onSubmit={onSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            {Object.keys(fields).map((key, idx) => {
              const { label, footer, placeholder } = fields[key];
              return (
                <Field label={label} name={key} key={idx}>
                  {({ fieldProps }) => (
                    <>
                      <Textfield
                        placeholder={placeholder}
                        {...fieldProps}
                        type={key}
                      />
                      {footer && <HelperMessage>{footer}</HelperMessage>}
                    </>
                  )}
                </Field>
              );
            })}
            <FormFooter>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
      <HelperMessage>
        Don't have an account?{" "}
        <Link to="/sign-up" style={{ marginLeft: "0.1rem" }}>
          Sign up
        </Link>
      </HelperMessage>
    </Flex>
  );
};

export default Login;
