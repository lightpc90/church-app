// components/Form.tsx
import React, { useState } from "react";
import Button from "./Button";

interface FormProps {
  onSubmit: (formData: { [key: string]: string }) => void;
  initialValues?: { [key: string]: string };
  submitButtonText?: string;
  submitButtonLoading?: boolean;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues = {},
  submitButtonText = "Submit",
  submitButtonLoading = false,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    initialValues
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          rows={4}
          required
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="medium"
        loading={submitButtonLoading}
      >
        {submitButtonText}
      </Button>
    </form>
  );
};

export default Form;
