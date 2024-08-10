import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <p>You've added your meetings to Forest. blah blah blah</p>
    <p>
      Here's what to expect from forest: we'll be handling reminding your team members for meetings and providing shared notes spaces. As you keep using forest and building the knowledge base of notes between yourself and your direct reports, Forest will grow with you and start providing more intelligent insight, all from a single, easy to access place. No more cluttered blah blah im bored of typing this shit blah blah more padding text blah blah is this thing still on
    </p>
  </div>
);

