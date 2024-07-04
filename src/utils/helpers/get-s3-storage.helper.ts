import nconf from "nconf";
import { CloudStorage, ErrorCodes } from "../types";
import { S3Storage } from "../s3-storage";
import { GenericError } from "../errors";



function getS3Storage(
	bucketName: string
): CloudStorage {
	const s3Storage = new S3Storage();
	const s3ApiVersion = nconf.get("s3ApiVersion");
	const s3hostName = nconf.get("s3hostName");
	const s3Protocol = nconf.get("s3Protocol");
	const s3SignatureVersion = nconf.get("s3SignatureVersion");
	const s3RegionName = nconf.get("s3RegionName");

	if (!s3ApiVersion) throw new GenericError({
		code: ErrorCodes.internalError,
		error: new Error("S3 storage, apiVersion must be set in configurations"),
		errorCode: 500
	});

	if (!s3hostName) throw new GenericError({
		code: ErrorCodes.internalError,
		error: new Error("S3 storage, hostName must be set in configurations"),
		errorCode: 500
	});

	if (!s3Protocol) throw new GenericError({
		code: ErrorCodes.internalError,
		error: new Error("S3 storage, protocol must be set in configurations"),
		errorCode: 500
	});

	if (!s3SignatureVersion) throw new GenericError({
		code: ErrorCodes.internalError,
		error: new Error("S3 storage, signature version must be set in configurations"),
		errorCode: 500
	});

	if (!s3RegionName) throw new GenericError({
		code: ErrorCodes.internalError,
		error: new Error("S3 storage, region name must be set in configurations"),
		errorCode: 500
	});


	s3Storage.apiVersion = nconf.get("s3ApiVersion");
	s3Storage.bucketName = bucketName;
	s3Storage.forcePathStyle = true;
	s3Storage.hostname = nconf.get("s3hostName");
	s3Storage.protocol = nconf.get("s3Protocol");
	s3Storage.signatureVersion = nconf.get("s3SignatureVersion");
	s3Storage.regionName = nconf.get("s3RegionName");

	if (nconf.get("s3AccessKeyId"))
		s3Storage.accessKeyId = nconf.get("s3AccessKeyId");

	if (nconf.get("s3SecretAccessKey"))
		s3Storage.secretAccessKey = nconf.get("s3SecretAccessKey");

	s3Storage.init();

	return s3Storage;
}

export {
	getS3Storage
};