"use client";

import { useForm } from "react-hook-form";

type DealsFormData = {
  title: string;
  shortDescription: string;
  tag: string;
  promoCode: string;
  expiresDate: string;
};

export function AddDealsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealsFormData>({
    defaultValues: {
      title: "",
      shortDescription: "",
      tag: "",
      promoCode: "",
      expiresDate: "",
    },
  });

  const onSubmit = (data: DealsFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div>
        <h3 className="text-3xl font-medium">Create Deals</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  mx-auto mt-8">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-black mb-3">
            Title <span className="text-black">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="e.g. 20% Off Premium Car Wash"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-black mb-3">
            Short Description <span className="text-black">*</span>
          </label>
          <textarea
            {...register("shortDescription", {
              required: "Short Description is required",
            })}
            placeholder="Special rate for Elite Network members on commercial insurance"
            rows={3}
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all resize-none"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Tag */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-black mb-3">
            Tag <span className="text-black">*</span>
          </label>
          <input
            {...register("tag", { required: "Tag is required" })}
            type="text"
            placeholder="Service"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
          {errors.tag && (
            <p className="text-red-500 text-xs mt-1">{errors.tag.message}</p>
          )}
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-black mb-3">
            Promo Code <span className="text-black">*</span>
          </label>
          <input
            {...register("promoCode", { required: "Promo Code is required" })}
            type="text"
            placeholder="ELITE20"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
          {errors.promoCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.promoCode.message}
            </p>
          )}
        </div>

        {/* Expires Date */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-black mb-3">
            Expires Date <span className="text-black">*</span>
          </label>
          <input
            {...register("expiresDate", {
              required: "Expires Date is required",
            })}
            type="text"
            placeholder="Feb 15"
            className="w-full px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
          {errors.expiresDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.expiresDate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all duration-200 text-center"
        >
          Create Deals
        </button>
      </form>
    </>
  );
}
