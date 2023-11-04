import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";

export default function ChangeLanguage() {
  return (
    <Select
      isDisabled={true}
      className="max-w-xs outline-none hover:outline-none hover:bg-transparent "
      label="Select language"
    >
      <SelectItem
        key="germany"
        startContent={
          <Avatar
            alt="Germany"
            className="w-6 h-6"
            src="https://flagcdn.com/de.svg"
          />
        }
      >
        Germany
      </SelectItem>
      <SelectItem
        key="spain"
        startContent={
          <Avatar
            alt="Spain"
            className="w-6 h-6"
            src="https://flagcdn.com/es.svg"
          />
        }
      >
        Spain
      </SelectItem>
      <SelectItem
        key="france"
        startContent={
          <Avatar
            alt="France"
            className="w-6 h-6"
            src="https://flagcdn.com/gb-eng.svg"
          />
        }
      >
        England
      </SelectItem>
    </Select>
  );
}
