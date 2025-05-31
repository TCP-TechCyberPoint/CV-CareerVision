import { SelectField } from "../index";

interface PreferenceSelectFieldProps {
  label: string;
  placeholder: string;
  collection: any;
  error?: string;
  value?: string;
  onValueChange: (value: any) => void;
  description?: string;
}

const PreferenceSelectField = ({
  label,
  placeholder,
  collection,
  error,
  value,
  onValueChange,
  description,
}: PreferenceSelectFieldProps) => {
  return (
    <div>
      {description && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "#718096",
            marginBottom: "0.5rem",
          }}
        >
          {description}
        </p>
      )}
      <SelectField
        label={label}
        placeholder={placeholder}
        collection={collection}
        error={error}
        invalid={!!error}
        value={value}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default PreferenceSelectField;
