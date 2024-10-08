import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { InstructorRepository, InstructorUpdatedEventValueObject } from "../../domain";
import { InstructorUpdatedEventRequestDTO } from "../dto";
import { ProcessInstructorUpdatedEventUseCase } from "./process-instructor-updated-event.use-case.type";



export class ProcessInstructorUpdatedEventUseCaseImpl implements
	ProcessInstructorUpdatedEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _instructorUpdatedEventRequestDTO: InstructorUpdatedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set instructorUpdatedEventRequestDTO(
		instructorUpdatedEventRequestDTO: InstructorUpdatedEventRequestDTO
	) {
		this._instructorUpdatedEventRequestDTO =
			instructorUpdatedEventRequestDTO;
	}


	async execute(): Promise<void> {
		const instructorRepository = this._unitOfWork.getRepository("InstructorRepository") as InstructorRepository;

		const instructorUpdatedEventValueObject =
			new InstructorUpdatedEventValueObject();
		instructorUpdatedEventValueObject.email =
			this._instructorUpdatedEventRequestDTO.email;
		instructorUpdatedEventValueObject.firstName =
			this._instructorUpdatedEventRequestDTO.firstName;
		instructorUpdatedEventValueObject.id =
			this._instructorUpdatedEventRequestDTO.id;
		instructorUpdatedEventValueObject.lastName =
			this._instructorUpdatedEventRequestDTO.lastName;
		instructorUpdatedEventValueObject.designation = 
			this._instructorUpdatedEventRequestDTO.designation;
		instructorUpdatedEventValueObject.profilePicture =
			this._instructorUpdatedEventRequestDTO.profilePicture;
		instructorUpdatedEventValueObject.userId =
			this._instructorUpdatedEventRequestDTO.userId;
		instructorUpdatedEventValueObject.version =
			this._instructorUpdatedEventRequestDTO.version;

		await instructorRepository
			.updateInstructorFromMessagingQueue(
				instructorUpdatedEventValueObject
			);
	}
}