export interface Command {
  id: string;
  name: string;
  readme: string;
  images: string[];
  commands: string[];
  body: string;
  attribute: AttributeCommand[];
}

export interface AttributeCommand {
  body: string;
  description: string;
}
