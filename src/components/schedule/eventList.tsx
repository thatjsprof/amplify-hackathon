import {
  Button,
  Heading,
  Loader,
  SelectField,
  TabItem,
  Tabs,
  Text,
} from "@aws-amplify/ui-react";
import {
  endOfDay,
  endOfWeek,
  format,
  isThisYear,
  isToday,
  isValid,
  isYesterday,
  parseISO,
  startOfDay,
} from "date-fns";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Refresh from "src/assets/svgs/refresh";
import useValidation from "src/helpers/form";
import { ICheckFree } from "src/interfaces/event";
import { getEvents, getFreeTime } from "src/services/event";
import { useStore } from "src/store/store";

type DateType = "today" | "week";

export const formatDateAccurate = (d: string | number | Date) => {
  let date = new Date();

  if (parseISO(`${d}`)) {
    date = new Date(d);
  }

  if (!isValid(date)) {
    return "";
  }

  if (typeof +d === "number") {
    date = new Date(+d);
  }

  date = new Date(d);

  if (isToday(date)) {
    return `Today at ${format(date, "kk:mm")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "kk:mm")}`;
  }

  if (!isThisYear(date)) {
    return `${format(date, "do")} of ${format(date, "MMM, yyyy")} at ${format(
      date,
      "kk:mm"
    )}`;
  }

  return `${format(date, "do")} of ${format(date, "MMM")}  at ${format(
    date,
    "kk:mm"
  )}`;
};

// const formatDate = (d: Date | string) => {
//   let date = new Date();

//   if (parseISO(`${d}`)) {
//     date = new Date(d);
//   }

//   if (!isValid(date)) {
//     return "";
//   }

//   if (typeof +d === "number") {
//     date = new Date(+d);
//   }

//   date = new Date(d);

//   return `${format(date, "do")} of ${format(date, "MMM")}  at ${format(
//     date,
//     "kk:mm"
//   )}`;
// };

const determineDate = (type: DateType) => {
  const date = new Date();

  switch (type) {
    case "today":
      return {
        start: startOfDay(date),
        end: endOfDay(date),
      };
    case "week":
      return {
        start: startOfDay(date),
        end: endOfWeek(date),
      };
    default:
      return {
        start: null,
        end: null,
      };
  }
};

interface IBusy {
  start: string;
  end: string;
}

interface IEventTime {
  dateTime: string;
  timeZone: string;
}

interface IEvents {
  summary: string;
  description: string;
  end: IEventTime;
  start: IEventTime;
}

const initialValues = {
  startDate: "",
  endDate: "",
};

const EventList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGet, setLoadingGet] = useState<boolean>(false);
  const [busy, setBusy] = useState<IBusy[]>([]);
  const [events, setEvents] = useState<IEvents[]>([]);
  const id = useStore((state) => state.user.user?.id);
  const [dateInfo, setDateInfo] = useState<{
    startDate: null | Date;
    endDate: null | Date;
  }>({
    startDate: null,
    endDate: null,
  });

  const fetchEvents = async (event = dateInfo) => {
    setLoadingGet(true);
    const response = await getEvents({ event, userId: id });
    setEvents(response);
    setLoadingGet(false);
  };

  const selectChange = async (type: DateType) => {
    const dateInfo = determineDate(type);

    const event = {
      startDate: dateInfo.start,
      endDate: dateInfo.end,
    };

    setDateInfo(event);

    fetchEvents(event);
  };

  const handleSubmit = async (values: ICheckFree) => {
    const event = {
      startDate: values.startDate,
      endDate: values.endDate,
    };

    setLoading(true);
    const result = await getFreeTime({
      event,
      userId: id,
    });
    setBusy(result);
    setLoading(false);
    // resetForm();
  };

  const {
    values,
    // resetForm,
    setFieldValue,
    handleSubmit: onSubmit,
  } = useValidation({
    initialValues,
    onSubmit: (values: ICheckFree) => {
      handleSubmit(values);
    },
  });

  return (
    <Tabs justifyContent="flex-start">
      <TabItem title="Upcoming Events">
        <div
          style={{
            display: "flex",
            marginTop: "2rem",
            alignItems: "start",
            marginBottom: "2rem",
            justifyContent: "space-between",
          }}
        >
          <Heading
            level={5}
            style={{
              gap: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            Upcoming Events
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                if (dateInfo.startDate && dateInfo.endDate) {
                  fetchEvents();
                }
              }}
            >
              <Refresh />
            </span>
          </Heading>
          <SelectField
            label="Filters"
            onChange={(e) => {
              const datePeriod = e.target.value as DateType;
              selectChange(datePeriod);
            }}
          >
            <option value="">Choose Filter</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </SelectField>
        </div>
        {loadingGet ? (
          <Loader />
        ) : (
          <>
            {events.length > 0 ? (
              <div>
                {events.map((event) => {
                  return (
                    <div
                      key={event.description}
                      style={{
                        display: "flex",
                        padding: "2rem",
                        borderRadius: "5px",
                        alignItems: "center",
                        marginBottom: "1rem",
                        justifyContent: "space-between",
                        backgroundColor: "rgb(250, 250, 250)",
                      }}
                    >
                      <div>
                        <Text>{event?.summary}</Text>
                        <Text>{event?.description}</Text>
                      </div>
                      <div>
                        <Text
                          style={{
                            gap: "1rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Start Time:
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {formatDateAccurate(event?.start?.dateTime)}
                          </span>
                        </Text>
                        <Text
                          style={{
                            gap: "1rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          End Time:
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {formatDateAccurate(event?.end?.dateTime)}
                          </span>
                        </Text>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Text>
                Please select a time period to get your upcoming events
              </Text>
            )}
          </>
        )}
      </TabItem>
      <TabItem title="Check Free time">
        {/* Render free time component */}
        <form noValidate onSubmit={onSubmit}>
          <div
            style={{
              marginTop: "2rem",
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
            <ReactDatePicker
              showTimeSelect
              minDate={new Date()}
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
            <ReactDatePicker
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
            style={{
              marginTop: "2rem",
            }}
            isLoading={loading}
          >
            Check Now
          </Button>
        </form>
        {busy.length > 0 && (
          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <Heading
              level={6}
              style={{
                marginBottom: "1rem",
              }}
            >
              This is the times you're busy within the period selected
            </Heading>
            {busy.map((info, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: ".5rem",
                  }}
                >
                  Busy between {formatDateAccurate(info.start)} and{" "}
                  {formatDateAccurate(info.end)}
                </div>
              );
            })}
          </div>
        )}
      </TabItem>
    </Tabs>
  );
};

export default EventList;
