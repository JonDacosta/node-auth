import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {

    async register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
        
        const { name, email, password } = registerUserDto;

        try {
            
            const exists = await UserModel.findOne({ email });
            
            if( exists ) throw CustomError.badRequest('User already exists')
            
            const user = await UserModel.create({
                name: name,
                email: email,
                password: BcryptAdapter.hash(password),
            });

            //Hash del pass
            await user.save();


            // TO DO falta un mapper
            return new UserEntity(
                user.id,
                name,
                email,
                password,
                user.roles,
            )

        } catch ( error ) {
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}