import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
} from "@/services/features/authors/slice";
import { useAddAuthorsToArticleMutation } from "@/services/features/submission/submissionApi";
import { useToastMutation } from "@/hooks/useNotification";
import { useAuth } from "@/hooks/useAuth";

const validationSchema = Yup.object().shape({
  author_fname: Yup.string().required("Required"),
  author_lname: Yup.string().required("Required"),
  author_designation: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});

export default function AddAuthorModal({
  isOpen,
  onClose,
  email,
  hasAuthor,
  author,
  articleId,
}) {
  const {journal} = useAuth()
  const [createAuthor] = useCreateAuthorMutation();
  const [updateAuthor, updateData] = useUpdateAuthorMutation();
  const [addAuthorToArtcle] = useToastMutation(
    useAddAuthorsToArticleMutation(),
    { showLoading: true }
  );

  if (!isOpen) return null;

  const { data = null } = author || {};

  const initialValues = {
    journal_id: journal?.journal_id || "",
    author_id: data ? data.author_id : "",
    author_fname: data ? data.author_fname : "",
    author_lname: data ? data.author_lname : "",
    author_designation: data ? data.author_designation : "",
    author_email: email,
    country: "",
    city: "",
  };

  const handleAuthorSubmit = async (values, setSubmitting) => {
    if (data && initialValues.author_id) {
      await updateAuthor(values);
      if (updateData && updateData.status) {
        addAuthorToArtcle({
          article_id: articleId,
          author_id: values.author_id,
        });
      }
    } else {
      try {
        const createdAuthor = await createAuthor(values);
        if (createdAuthor && createdAuthor.data.status) {
          addAuthorToArtcle({
            article_id: articleId,
            author_id: createdAuthor.data.status
              ? createdAuthor.data.data.author_id
              : "",
          });
        }
      } catch (error) {
        console.log(error)
        return alert("Error adding author. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add an Author</h2>
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
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleAuthorSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-5">
                  <label className="text-sm font-medium">First Name</label>
                  <Field
                    name="author_fname"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage
                    name="author_fname"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                {/* <div className="col-span-2">
                  <label className="text-sm font-medium">MI</label>
                  <Field
                    name="middleInitial"
                    type="text"
                    maxLength={1}
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage name="middleInitial" component="div" className="text-red-500 text-xs" />
                </div> */}
                <div className="col-span-5">
                  <label className="text-sm font-medium">Last Name</label>
                  <Field
                    name="author_lname"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage
                    name="author_lname"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Department</label>
                <Field
                  as="textarea"
                  name="author_designation"
                  rows={3}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                />
                <ErrorMessage
                  name="author_designation"
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
                  Add Author
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
