import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddReviewersToArticleMutation } from "@/services/features/submission/submissionApi";
import { useToastMutation } from "@/hooks/useNotification";
import {
  useCreateReviewerMutation,
  useUpdateReviewerMutation,
} from "@/services/features/reviewers/slice";

const validationSchema = Yup.object().shape({
  reviewer_name: Yup.string().required("Required"),
  reviewer_designation: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  reviewer_type: Yup.string().required("Required"),
});

export default function AddReviewerModal({
  isOpen,
  onClose,
  email,
  hasAuthor,
  reviewer,
  articleId
}) {
  const [createReviewer] = useCreateReviewerMutation();
  const [updateReviewer, updateData] = useUpdateReviewerMutation();
  const [addReviewerToArtcle] = useToastMutation(
    useAddReviewersToArticleMutation(),
    { showLoading: true }
  );

  if (!isOpen) return null;

  const { data = null } = reviewer || {};

  const initialValues = {
    reviewer_id: data ? data.reviewer_id : "",
    reviewer_name: data ? data.reviewer_name : "",
    reviewer_type: "",
    reviewer_designation: data ? data.reviewer_designation : "",
    reviewer_email: email,
    country: "",
    city: "",
  };

  console.log(initialValues);

  const handleReviewerSubmit = async (values, setSubmitting) => {
    if (data && initialValues.reviewer_id) {
      await updateReviewer(values);
      if (updateData && updateData.status) {
        addReviewerToArtcle({
          article_id: articleId,
          reviewer_id: values.reviewer_id,
          reviewer_type: values.reviewer_type,
        });
      }
      setSubmitting(false)
    } else {
      const createdReviewer = await createReviewer(values);
      if (createdReviewer && createdReviewer.data.status) {
        addReviewerToArtcle({
          article_id: articleId,
          reviewer_id: createdReviewer.data.status
            ? createdReviewer.data.data.reviewer_id
            : "",
          reviewer_type: values.reviewer_type,
        });
        setSubmitting(false)
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add an Reviewer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>

        {!hasAuthor ? (
          <p className="text-sm text-gray-600 mb-4">
            We didn't find an account associated with this email address. Please
            complete all fields and we will invite your co-author to confirm.
          </p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            We found an Author with the given email Add author to the artcle by
            clicking add author.
          </p>
        )}

        <div className="mb-4">
          <label className="text-sm font-medium">
            Email: <span className="text-blue-600">{email}</span>
          </label>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleReviewerSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12">
                  <label className="text-sm font-medium">Select type</label>
                  <Field
                    as="select"
                    name="reviewer_type"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="oppose">Opposed</option>
                    <option value="suggested">Suggested</option>
                  </Field>
                  <ErrorMessage
                    name="reviewer_type"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="col-span-12">
                  <label className="text-sm font-medium">First Name</label>
                  <Field
                    name="reviewer_name"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage
                    name="reviewer_name"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Department</label>
                <Field
                  as="textarea"
                  name="reviewer_designation"
                  rows={3}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                />
                <ErrorMessage
                  name="reviewer_designation"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Field
                    as="select"
                    name="country"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                    <option value="de">Germany</option>
                    <option value="fr">France</option>
                    <option value="in">India</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Field
                    name="city"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded border text-sm bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add Reviewer
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
