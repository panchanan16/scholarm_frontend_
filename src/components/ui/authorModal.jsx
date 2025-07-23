import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  middleInitial: Yup.string().max(1, "Max 1 character"),
  lastName: Yup.string().required("Required"),
  specialty: Yup.string().required("Required"),
  hospitalInstitution: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
})

export default function AddAuthorModal({ isOpen, onClose, email }) {
  if (!isOpen) return null

  const initialValues = {
    firstName: "",
    middleInitial: "",
    lastName: "",
    specialty: "",
    hospitalInstitution: "",
    department: "",
    country: "",
    city: "",
  }

  const handleSubmit = (values) => {
    console.log("Author submitted:", { email, ...values })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add an Author</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          We didn't find an account associated with this email address. Please complete all fields and we will invite
          your co-author to confirm.
        </p>

        <div className="mb-4">
          <label className="text-sm font-medium">Email: <span className="text-blue-600">{email}</span></label>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-5">
                  <label className="text-sm font-medium">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs" />
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
                    name="lastName"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs" />
                </div>
              </div>
{/* 
              <div className="mb-4">
                <label className="text-sm font-medium">Specialty</label>
                <Field
                  as="select"
                  name="specialty"
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="neurology">Neurology</option>
                  <option value="oncology">Oncology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="surgery">Surgery</option>
                  <option value="internal-medicine">Internal Medicine</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="specialty" component="div" className="text-red-500 text-xs" />
              </div> */}

              {/* <div className="mb-4">
                <label className="text-sm font-medium">Hospital/Institution</label>
                <Field
                  name="hospitalInstitution"
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                />
                <ErrorMessage name="hospitalInstitution" component="div" className="text-red-500 text-xs" />
              </div> */}

              <div className="mb-4">
                <label className="text-sm font-medium">Department</label>
                <Field
                  as="textarea"
                  name="department"
                  rows={3}
                  className="w-full border rounded px-3 py-2 mt-1 text-sm"
                />
                <ErrorMessage name="department" component="div" className="text-red-500 text-xs" />
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
                  <ErrorMessage name="country" component="div" className="text-red-500 text-xs" />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Field
                    name="city"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1 text-sm"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded border text-sm bg-gray-100 hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50">
                  Add Author
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
