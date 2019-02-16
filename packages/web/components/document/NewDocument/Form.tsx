// import { registerValidationSchema } from '@docms/common';
import { InputField } from '@docms/ui';
import { Field, FormikErrors, FormikProps, withFormik } from 'formik';
import * as React from 'react';
import {
  Button,
  Form,
  Message,
  Dropdown,
  DropdownProps,
  DropdownItemProps,
} from 'semantic-ui-react';
import { AllTagsAllTags } from '@docms/controller';

export interface FormValues {
  title: string;
  tags: string[];
}

interface FormErrors {
  form?: string;
}

export interface Props {
  submit: (
    values: FormValues,
  ) => Promise<FormikErrors<FormValues & FormErrors> | null>;
  tags: AllTagsAllTags[];
}

class Cmp extends React.Component<
  FormikProps<FormValues & FormErrors> & Props
> {
  public state = {
    tags: this.props.tags.map(({ title }) => ({
      text: title,
      value: title,
    })),
  };

  public handleAddition = (_: any, { value }: DropdownProps) => {
    console.log('handleAddition', value);
    const newTag: DropdownItemProps = { text: value, value: value as string };
    this.setState({
      tags: [...this.state.tags, newTag],
    });
  };

  public handleChange = (_: any, { value }: DropdownProps) => {
    const { setFieldValue } = this.props;
    console.log('handleChange', value);
    setFieldValue('tags', value);
    return this.setState({ currentValue: value as string });
  };

  public render() {
    const { handleSubmit, errors } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        error={!!errors}
        data-testid="register-form"
      >
        {errors.form && (
          <Message negative={!!errors.form}>{errors.form}</Message>
        )}
        <Field name="title" label="Title" required component={InputField} />
        <Dropdown
          placeholder="Tags"
          fluid
          multiple
          search
          selection
          allowAdditions
          options={this.state.tags}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
        />
        <Form.Field required>
          <Button type="submit">Add</Button>
        </Form.Field>
      </Form>
    );
  }
}

export const RegisterForm = withFormik<Props, FormValues>({
  // validationSchema: registerValidationSchema,
  mapPropsToValues: () => ({ title: '', tags: [] }),
  handleSubmit: async (
    values,
    { props, setErrors, setValues, setFormikState },
  ) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      setValues({ title: '', tags: [] });
    }
  },
})(Cmp);
