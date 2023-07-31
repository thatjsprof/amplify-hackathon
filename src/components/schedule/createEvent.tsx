import {
  Button,
  Heading,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useValidation from "src/helpers/form";
import { ICreateEvent } from "src/interfaces/event";
import { useStore } from "src/store/store";
import { useEffect, useState } from "react";
import Bin from "src/assets/svgs/bin";
import { addEvent } from "src/services/event";
import { notify } from "src/helpers/toast";

const initialValues = {
  title: "",
  description: "",
  startDate: "",
  startTimezone: "",
  endDate: "",
  endTimezone: "",
  emails: [],
  linkedToTask: false,
};

const CreateEvent = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoaading] = useState<boolean>(false);
  const id = useStore((state) => state.user.user?.id);
  const [tasks, fetchTasks] = useStore((state) => [
    state.task.tasks,
    state.task.fetchTasks,
  ]);

  const handleSubmit = async (values: ICreateEvent, resetForm: () => void) => {
    const event = {
      title: values.title,
      location: "800 Howard St., San Francisco, CA 94103", // Change or provide for this
      description: values.description,
      startDate: values.startDate
        ? (values.startDate as Date).toISOString()
        : null,
      startTimezone: "America/Los_Angeles", // change this later
      endDate: values.endDate ? (values.endDate as Date).toISOString() : null,
      endTimezone: "America/Los_Angeles", // change this later
      emails: values.emails,
      linkedToTask: values.linkedToTask,
    };

    setLoaading(true);
    const result = await addEvent({
      event,
      userId: id,
    });
    setLoaading(false);

    notify(result?.message);

    resetForm();
  };

  const {
    values,
    // errors,
    resetForm,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit: onSubmit,
  } = useValidation({
    initialValues,
    onSubmit: (values: ICreateEvent) => {
      handleSubmit(values, resetForm);
    },
  });

  const deleteEmail = (email: string) => {
    const emails = [...values.emails];

    const index = emails.findIndex((e) => {
      return e === email;
    });

    if (index >= 0) {
      emails.splice(index, 1);
    }

    setFieldValue("emails", emails);
  };

  useEffect(() => {
    if (id) {
      fetchTasks(id);
    }
  }, [id]);

  return (
    <div
      style={{
        maxWidth: "25rem",
      }}
    >
      <Heading
        level={6}
        style={{
          marginBottom: "2rem",
        }}
      >
        Create New Event
      </Heading>
      <form noValidate onSubmit={onSubmit}>
        <label
          style={{
            display: "block",
            marginBottom: ".3rem",
            color: "rgb(48, 64, 80)",
          }}
        >
          Choose Task
        </label>
        <Select
          onChange={(e) => {
            setFieldValue("title", e?.label);
            setFieldValue("description", e?.value);
            setFieldValue("linkedToTask", true);
          }}
          options={tasks.map((task) => ({
            value: task.description as string,
            label: task.title as string,
          }))}
          value={{
            value: values.description,
            label: values.title,
          }}
          styles={{
            container: () => ({
              position: "relative",
              marginBottom: "2rem",
            }),
          }}
          placeholder="Choose existing task"
        />
        <TextField
          label="Title"
          style={{
            marginBottom: "1.5rem",
          }}
          required={true}
          name="title"
          onBlur={handleBlur}
          value={values.title}
          onChange={(e) => {
            handleChange(e);
            setFieldValue("linkedToTask", false);
          }}
        />
        <TextAreaField
          label="Details"
          style={{
            marginBottom: "1.5rem",
          }}
          name="description"
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
            setFieldValue("linkedToTask", false);
          }}
          value={values.description}
        />
        <TextField
          label="Invitees (Press enter to save)"
          name="emails"
          value={email}
          onBlur={handleBlur}
          onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            const newEmail = (e.target as any).value;

            if (newEmail && e.code === "Enter") {
              const emailsToSave: string[] = [...values.emails];

              if (!emailsToSave.includes(newEmail)) {
                emailsToSave.push(newEmail);

                setFieldValue("emails", emailsToSave);
                setEmail("");
              }

              e.preventDefault();
            }
          }}
        />
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          {values.emails.map((email) => {
            return (
              <p
                key={email}
                style={{
                  gap: 5,
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(48, 64, 80)",
                }}
              >
                {email}
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: ".5rem",
                    display: "inline-block",
                  }}
                  onClick={() => {
                    deleteEmail(email);
                  }}
                >
                  <Bin />
                </span>
              </p>
            );
          })}
        </div>
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: ".3rem",
              color: "rgb(48, 64, 80)",
            }}
          >
            Start Date
          </label>
          <DatePicker
            showTimeSelect
            selected={values.startDate ? new Date(values.startDate) : null}
            onChange={(date) => {
              setFieldValue("startDate", date);
            }}
          />
        </div>
        <div
          style={{
            marginBottom: "1.5rem",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: ".3rem",
              color: "rgb(48, 64, 80)",
            }}
          >
            End Date
          </label>
          <DatePicker
            showTimeSelect
            selected={values.endDate ? new Date(values.endDate) : null}
            onChange={(date) => {
              setFieldValue("endDate", date);
            }}
            minDate={values.startDate ? new Date(values.startDate) : null}
          />
        </div>
        <Button
          type="submit"
          isLoading={loading}
          style={{
            marginTop: "2.5rem",
          }}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
