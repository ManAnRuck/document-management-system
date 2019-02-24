import { newDocumentValidationSchema } from '@docms/common';
import { InputField, Dropzone } from '@docms/ui';
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
  file: File | undefined;
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
  public handleAddition = (_: any, { value }: DropdownProps) => {
    const { setStatus, status } = this.props;
    const newTag: DropdownItemProps = { text: value, value: value as string };
    setStatus({
      ...status,
      tags: [...status.tags, newTag],
    });
  };

  public handleChange = (_: any, { value }: DropdownProps) => {
    const { setFieldValue, setStatus, status } = this.props;
    setFieldValue('tags', value);
    return setStatus({ ...status, currentValue: value as string });
  };

  public onDrop = (acceptedFiles: File[]) => {
    const { setFieldValue } = this.props;
    // Do something with files
    console.log(acceptedFiles[0]);
    setFieldValue('file', acceptedFiles[0]);
  };

  public render() {
    const { handleSubmit, errors, status } = this.props;
    return (
      <Form
        onSubmit={handleSubmit}
        error={!!errors}
        data-testid="newDocument-form"
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
          options={status.tags}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
        />
        <Dropzone onDrop={this.onDrop} />
        <Form.Field required>
          <Button type="submit">Add</Button>
        </Form.Field>
      </Form>
    );
  }
}

export const RegisterForm = withFormik<Props, FormValues>({
  validationSchema: newDocumentValidationSchema,
  mapPropsToStatus: props => ({
    tags:
      (props.tags &&
        props.tags.map(({ title }) => ({
          text: title,
          value: title,
        }))) ||
      [],
    currentValue: [],
  }),
  mapPropsToValues: () => ({ title: '', tags: [], file: undefined }),
  handleSubmit: async (values, { props, setErrors, setValues, resetForm }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      setValues({ title: '', tags: [], file: undefined });
      resetForm();
    }
  },
})(Cmp);
