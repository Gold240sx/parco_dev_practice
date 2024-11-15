# Developer Notes

## Developer decisions

### Why I chose to build the first page

The component belongs to a multi-page form, so the validation of one screen is in direct connection to the validation of the form as a whole. Because of this, I built out the first screen as well, since it didn't add much to the duration of development time and assisted in the overall coherant design styles across the form pages. It also allowed me to prove the working handling of form data sumission for testing of my schema as a whole.

### Details

#### Page 1 of the form

-   Phone Number autoformats as the user types.
-   Phone Number Area Code is validated, as a prevention method agains ddos attacks and ensuring valid data input from the user.
-   Phone number data can be output into various options. (For the sake of time, I ommitted this feature)
-   The Day dropdown in the Date of Birth field is populated with the days of the month according to the date selected.
-   I added a `X` icon to the right of the text inputs if they are invalid.
-   The form validates each field as the user types (this can be changed to onBlur or even onNextClick easily), and displays various errors if the input is invalid.
-   The form validates each page before allowing the user to proceed to the next page.
-   The form validates the entire form before submitting the data or clearing the form data.
-   Form fields are set to autocomplete to help users fill out the form faster.

#### Page 2 of the form

-   I recreated the zoom logo into SVG format for faster loading times and better quality.
-   I dowloaded the others into SVG for the same reason.
-   Calendar is set to limit the date range to a month out from the current date. (Can be easily changed), and I've worked with other calendars before if you're looking for alternative behaviors.

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

#### React Aria

-   Other than the fact that many of the components that OriginUI uses are built with React Aria, it is a library created by Adobe that provides a simple way to build accessible components. (I'm not the biggest fan of Adobe but I don't think they're going anywhere.)

#### React Icons

-   Provides a simple way to use icons in react projects.