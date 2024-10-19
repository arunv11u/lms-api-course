

enum MessagingTopics {
	studentCreatedEvent = "student-created-event",
	studentUpdatedEvent = "student-updated-event",
	instructorCreatedEvent = "instructor-created-event",
	instructorUpdatedEvent = "instructor-updated-event",
	courseTranscodingCompletedEvent = "course-transcoding-completed-event",
	stripeCheckoutCompletedEvent = "stripe-checkout-completed-event"
}

export {
	MessagingTopics
};