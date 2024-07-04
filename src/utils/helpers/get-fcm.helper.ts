import { CloudMessaging, firebaseCloudMessaging } from "@arunvaradharajalu/common.firebase-cloud-messaging";
import nconf from "nconf";


function getFCM(): CloudMessaging {
	const firebaseName = nconf.get("firebaseName");
	const firebaseProjectId = nconf.get("firebaseProjectId");
	const firebaseClientEmail = nconf.get("firebaseClientEmail");
	const firebasePrivateKey = nconf.get("firebasePrivateKey");

	firebaseCloudMessaging.name = firebaseName;
	firebaseCloudMessaging.projectId = firebaseProjectId;
	firebaseCloudMessaging.clientEmail = firebaseClientEmail;
	firebaseCloudMessaging.privateKey = firebasePrivateKey;

	firebaseCloudMessaging.init();

	return firebaseCloudMessaging;
}

export {
	getFCM
};