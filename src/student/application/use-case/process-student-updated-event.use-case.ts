import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { StudentRepository, StudentUpdatedEventValueObject } from "../../domain";
import { StudentUpdatedEventRequestDTO } from "../dto";
import { ProcessStudentUpdatedEventUseCase } from "./process-student-updated-event.use-case.type";



export class ProcessStudentUpdatedEventUseCaseImpl implements
	ProcessStudentUpdatedEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _studentUpdatedEventRequestDTO: StudentUpdatedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set studentUpdatedEventRequestDTO(
		studentUpdatedEventRequestDTO: StudentUpdatedEventRequestDTO
	) {
		this._studentUpdatedEventRequestDTO = studentUpdatedEventRequestDTO;
	}


	async execute(): Promise<void> {
		const studentRepository = this._unitOfWork.getRepository("StudentRepository") as StudentRepository;

		const studentUpdatedEventValueObject =
			new StudentUpdatedEventValueObject();
		studentUpdatedEventValueObject.email =
			this._studentUpdatedEventRequestDTO.email;
		studentUpdatedEventValueObject.firstName =
			this._studentUpdatedEventRequestDTO.firstName;
		studentUpdatedEventValueObject.id =
			this._studentUpdatedEventRequestDTO.id;
		studentUpdatedEventValueObject.lastName =
			this._studentUpdatedEventRequestDTO.lastName;
		studentUpdatedEventValueObject.profilePicture =
			this._studentUpdatedEventRequestDTO.profilePicture;
		studentUpdatedEventValueObject.userId =
			this._studentUpdatedEventRequestDTO.userId;
		studentUpdatedEventValueObject.version =
			this._studentUpdatedEventRequestDTO.version;

		await studentRepository
			.updateStudentFromMessagingQueue(studentUpdatedEventValueObject);
	}
}