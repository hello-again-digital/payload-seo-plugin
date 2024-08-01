import React, { useEffect } from 'react';
// You can import the text input on its own if you have payload@0.13.8-beta.0
import { TextInput, Select, useWatchForm, useForm, useField } from 'payload/components/forms';
import type { Props } from 'payload/components/fields/Select'

const SERPSchemaTemplateSelect = ({ name, path, label, options }: Props) => {
  // const { getDataByPath } = useWatchForm();

  const {
    showError,
    value,
    setValue,
  } = useField({ path: path! });

  // Grab your title's field value
  // const titleValue = getDataByPath('title');
  console.log('custom field in use')
  // When your title field changes, set the value of your field
  // useEffect(() => {
  //   setValue(titleValue);
  // }, [setValue, titleValue]);

  return (
    <Select
      path={path!}
      name={name}
      options={options}
      // value={value as string || ''}
      label={label}
      // showError={showError}
    />
  );
};

export default SERPSchemaTemplateSelect;