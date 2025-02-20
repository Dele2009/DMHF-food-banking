import { Card, Textarea, DatePicker, Form, DateValue } from "@heroui/react";
import { FaHandsHelping, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  details: yup.string().required("Details is required"),
  date: yup
    .date()
    .required("Date is required")
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Date must be today or later"
    )
    .max(
      new Date(new Date().setDate(new Date().getDate() + 30)),
      "Date cannot be more than 30 days ahead"
    ),
});

type RequestFormData = yup.InferType<typeof schema>;

const RequestHelpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formdata: RequestFormData) => {
    setIsLoading(true)
    try {
      console.log(formdata);
      const formattedData = {
        ...formdata,
        date: new Date(formdata.date).toLocaleDateString(),
      };
      const { data } = await axios.post("/api/auth/addReq", formattedData);
      reset();
      toast.success(data.message);
    } catch (err: AxiosError | any) {
      console.log(err);
      toast.error(err.response.data.mesage || err.message);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   const values = getValues()
  //   console.log(values);
  //   console.log("This is the date", date);
  //   const { day, month, year } = date
  //   console.log(day)
  //   console.log(new Date(year, month, day))
  // }, [date])
  // // const today = new Date().toLocaleString()
  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  return (
    <div className="p-2 md:p-6 space-y-6 w-full max-w-3xl mx-auto">
      {/* Header Section */}
      <Card className="p-6 bg-[#1e1e1e] shadow-md text-center">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 text-white">
          <FaHandsHelping /> Request Assistance
        </h2>
        <p className="text-gray-400">
          Submit your request and we will get back to you as soon as possible.
        </p>
      </Card>

      {/* Request Form */}
      <Card isBlurred className="p-6">
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            isDisabled={isLoading}
            label="Request Title"
            {...register("title")}
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
          />

          <Textarea
            isDisabled={isLoading}
            label="Request Details"
            {...register("details")}
            isInvalid={!!errors.details}
            errorMessage={errors.details?.message}
            variant="bordered"
            classNames={{
              inputWrapper:
                "border-yellow-500 group-data-[focus=true]:border-yellow-500",
              input: "dark:!bg-white dark:autofill:bg-white !text-white",
            }}
            placeholder="Describe your request in detail..."
            rows={4}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                isDisabled={isLoading}
                variant="bordered"
                classNames={{
                  base: "datepickerBase",
                }}
                // value={date}
                // onChange={setDate}
                {...field}
                value={field.value as unknown as DateValue}
                errorMessage={errors.date?.message}
                isInvalid={!!errors.date}
                label="Preferred Collection Date"
                minValue={today(getLocalTimeZone())}
              />
            )}
          />

          <div className="flex justify-center mt-4">
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              size="lg"
              color="primary"
            >
              Submit Request
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RequestHelpPage;
