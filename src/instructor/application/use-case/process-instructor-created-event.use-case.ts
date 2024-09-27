import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { InstructorCreatedEventValueObject, InstructorRepository } from "../../domain";
import { InstructorCreatedEventRequestDTO } from "../dto";
import { ProcessInstructorCreatedEventUseCase } from "./process-instructor-created-event.use-case.type";



export class ProcessInstructorCreatedEventUseCaseImpl implements
	ProcessInstructorCreatedEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _instructorCreatedEventRequestDTO: InstructorCreatedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set instructorCreatedEventRequestDTO(
		instructorCreatedEventRequestDTO: InstructorCreatedEventRequestDTO
	) {
		this._instructorCreatedEventRequestDTO =
			instructorCreatedEventRequestDTO;
	}


	async execute(): Promise<void> {
		const instructorRepository = this._unitOfWork.getRepository("InstructorRepository") as InstructorRepository;

		const instructorCreatedEventValueObject =
			new InstructorCreatedEventValueObject();
		instructorCreatedEventValueObject.email =
			this._instructorCreatedEventRequestDTO.email;
		instructorCreatedEventValueObject.firstName =
			this._instructorCreatedEventRequestDTO.firstName;
		instructorCreatedEventValueObject.id =
			this._instructorCreatedEventRequestDTO.id;
		instructorCreatedEventValueObject.lastName =
			this._instructorCreatedEventRequestDTO.lastName;
		instructorCreatedEventValueObject.userId =
			this._instructorCreatedEventRequestDTO.userId;
		instructorCreatedEventValueObject.version =
			this._instructorCreatedEventRequestDTO.version;

		await instructorRepository
			.saveInstructorFromMessagingQueue(
				instructorCreatedEventValueObject
			);
	}
}