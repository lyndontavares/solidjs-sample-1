import { Show, mergeProps, createEffect, Component } from 'solid-js';
import { createFormGroup, createFormControl } from 'solid-forms';
// here we import the TextInput component we defined above
import { TextInput } from './TextInput';
import { MyValidators } from './MyValidators';

export const Example: Component<{}> = () => {
  const group = createFormGroup({
    name: createFormControl(''),
    email: createFormControl('', {
      required: true,
      validators: [MyValidators.required, MyValidators.email],
    }),
  });

  // This will automatically re-run whenever `group.isDisabled`, `group.isValid` or `group.value` change
  createEffect(() => {
    if (group.isDisabled || !group.isValid) return;

    console.log('Current group value', group.value);
  });

  const onSubmit = async () => {
    if (group.isSubmitted) {
      console.log('already submitted');
      return;
    }

    if (!group.isValid) {
      console.log('form invalid');
      return;
    }

    group.markSubmitted(true);

    console.log('submitted!');
    // do stuff...
    // const { name, email } = group.value;
  };

  return (
    <form onSubmit={onSubmit}>
      <label for="name">Your name</label>
      <TextInput name="name" control={group.controls.name} />

      <label for="email">Your email address</label>
      <TextInput name="email" type="email" control={group.controls.email} />

      <button>Submit</button>
    </form>
  );
};
