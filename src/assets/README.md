# JSON requirements

* Questions must be in order. Avoids having to re-sort them client side

* No empty arrays (simplifies validation in Typescript)

* New **number_of_pages** field

* One page per API request. API request format will be 

  **?page_number=**

  If no page_number or if page_number=0, return first page.

* **max_size** must be valid. 

  Textarea and text inputs must have a max_size > 0
  
* **id_question_type** must be either string or number

* **id_block=-1** when there's no block (ie. top level question types)

* New **type_id** field for questions_by_types

* **id_question_type** field is a number and unique

## To check with EC

* is **id_question** always unique across different types?

* New **error_message_required** field?
  
  What message to display in form validation, when question is mandatory

* New **error_message_max_size** field?
 
  What message to display in form validation, when answer size is limited to X characters

* New **poll_leave_message** field: message to display when user wants to exit the form before submitting

* How are question **description** and question **label** used?

* Are child questions always dependent on checkbox/dropdown/radio questions? Or can they also depend on text questions? Change **question_dependency_answer** to number, representing the answer index

* What user information do we get when we log in? Is there an API?

* What does mandatory mean for checkboxes? Minimum one value checked?
