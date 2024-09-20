export const devConfig = {
	port: 3000,
	mongodbURL: "mongodb+srv://cluster0.qwm8c.gcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
	mongodbDatabaseName: "lms-main",
	messagingConsumerGroupId: "course-service-group",
	bootstrapKafkaBroker: "my-cluster-kafka-bootstrap.default.svc.cluster.local:9092"
};
