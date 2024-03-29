import React from "react";

interface ConnectedFormProps<T> {
  props: T;
}

function ConnectedForm<T>({ props }: ConnectedFormProps<T>) {
  return <div>{/* JSX content */}</div>;
}

export default ConnectedForm;
