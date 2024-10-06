export const devConfig = {
	port: 3000,
	mongodbURL: "mongodb+srv://cluster0.qwm8c.gcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
	mongodbDatabaseName: "lms-main",
	messagingConsumerGroupId: "course-service-group",
	bootstrapKafkaBroker: "my-cluster-kafka-bootstrap.default.svc.cluster.local:9092",
	s3ApiVersion: "2006-03-01",
	s3HostName: "s3.us-east-1.amazonaws.com",
	s3Protocol: "https",
	s3SignatureVersion: "s3v4",
	s3RegionName: "us-east-1",
	s3BucketName: "learning-management-system-project",
	elasticTranscoderPipelineId: "1719443759029-ew722s",
	elasticTranscoderHls2MPresetId: "1351620000001-200010"
};
