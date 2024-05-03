const { z } = require("zod");

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
    // .refine(value => value.endsWith('@nitc.ac.in'), {
    //     message: "Email must be from the nitc.ac.in domain"
    //   }),
    password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

// Creating an object schema
const signupSchema = loginSchema.extend({
  firstname: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  lastname: z
    .string()
    .trim()
    .min(1, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});


module.exports = {signupSchema, loginSchema}; 