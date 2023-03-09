import {
  Show,
  mergeProps,
  createEffect,
  Component,
  createRenderEffect,
  For,
} from 'solid-js';
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

  createRenderEffect(() => {
    if (!group.children.areValid) {
      group.setErrors(null);
      return;
    }

    const firstPartOfEmail = group.value.email?.split('@')[0];

    if (firstPartOfEmail !== group.value.name) {
      group.setErrors({ invalid: 'email must match name' });
    } else {
      group.setErrors(null);
    }
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

      <Show when={group.isTouched && !group.isValid}>
        <For each={Object.values(group.self.errors || {})}>
          {(errorMsg) => <small>{errorMsg}</small>}
        </For>
      </Show>

      <button>Submit</button>
    </form>
  );
};
