# Developer Notes

## Why I chose certain builds

### Why I chose to build the first page

The component belongs to a multi-page form, so the validation of one screen is in direct connection to the validation of the form as a whole. Because of this, I built out the first screen as well, since it didn't add much to the duration of development time and assisted in the overall coherant design styles across the form pages. It also allowed me to prove the working handling of form data sumission for testing of my schema as a whole.

### Why I chose certain technologies and libraries

#### Tailwind CSS

-   Fast, easy to use, and very powerful.
-   Large community, support and great documentation.

#### React Hook Form

-   Prevents unnecessary re-renders
-   Works seamlessly with zod for form validation and error handling
-   Very popular, performant, and well maintained

#### Zod

-   Provides a simple and easy way to validate form data.
-   Works seamlessly with react-hook-form
-   Provides a simple way to handle error messages
-   Very popular, performant, and well maintained

#### Origin UI

-   A robust and Tailwind based component library with coherant design styles, and smooth animations
-   Top-tier accessibility and react-aria integration

#### React Icons

-   Provides a simple way to use icons in react projects.
