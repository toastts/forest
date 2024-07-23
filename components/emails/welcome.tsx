import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>welcome to forest, {firstName}</h1>
    <p>Now you can sit back and wait for your forest to start
      handling your 1:1. Later loser!
    </p>
  </div>
);

