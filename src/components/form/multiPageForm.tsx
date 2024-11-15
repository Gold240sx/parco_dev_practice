"use client"
import { useState, useEffect, useRef, KeyboardEvent } from "react"
import { useForm, FormProvider, FieldValues } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
import { ZodSchema } from "zod" // Import 'z' from 'zod'
// import { MultiPageFormInternalFunctions } from "./MultiPageFormInternalFunctions" // Import the functions from the internal functions file
import { totalFormSchema as MultiPageFormProps } from "./formSchema"

// import { FormPreview } from "./MultiPageFormPreview"
import MultiPageFormButtons from "./multiPageFormButtons"
