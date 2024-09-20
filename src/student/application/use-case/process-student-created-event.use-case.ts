import { UnitOfWork, UnitOfWorkImpl } from "../../../utils";
import { StudentCreatedEventValueObject, StudentRepository } from "../../domain";
import { StudentCreatedEventRequestDTO } from "../dto";
import { ProcessStudentCreatedEventUseCase } from "./process-student-created-event.use-case.type";



export class ProcessStudentCreatedEventUseCaseImpl implements
	ProcessStudentCreatedEventUseCase {
	private _unitOfWork: UnitOfWork;
	private _studentCreatedEventRequestDTO: StudentCreatedEventRequestDTO;

	constructor() {
		this._unitOfWork = new UnitOfWorkImpl();
	}

	set studentCreatedEventRequestDTO(
		studentCreatedEventRequestDTO: StudentCreatedEventRequestDTO
	) {
		this._studentCreatedEventRequestDTO = studentCreatedEventRequestDTO;
	}


	async execute(): Promise<void> {
		const studentRepository = this._unitOfWork.getRepository("StudentRepository") as StudentRepository;

		const studentCreatedEventValueObject =
			new StudentCreatedEventValueObject();
		studentCreatedEventValueObject.email =
			this._studentCreatedEventRequestDTO.email;
		studentCreatedEventValueObject.firstName =
			this._studentCreatedEventRequestDTO.firstName;
		studentCreatedEventValueObject.id =
			this._studentCreatedEventRequestDTO.id;
		studentCreatedEventValueObject.lastName =
			this._studentCreatedEventRequestDTO.lastName;
		studentCreatedEventValueObject.userId =
			this._studentCreatedEventRequestDTO.userId;
		studentCreatedEventValueObject.version =
			this._studentCreatedEventRequestDTO.version;

		await studentRepository
			.saveStudentFromMessagingQueue(studentCreatedEventValueObject);
	}
}