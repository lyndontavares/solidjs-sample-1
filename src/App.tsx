import { Component, createSignal } from 'solid-js';
import { Example } from './Example';
import { Example as ExampleAlt } from './Example-alt';

const App: Component = () => {
  return (
    <>
      <div>
        <h1>Solid Forms Example 2</h1>

        <div style={{ padding: '1rem', border: '1px solid black' }}>
          <Example />
        </div>
      </div>

      <div>
        <h1>Alt example</h1>

        <div style={{ padding: '1rem', border: '1px solid black' }}>
          <ExampleAlt />
        </div>
      </div>
    </>
  );
};

export default App;
