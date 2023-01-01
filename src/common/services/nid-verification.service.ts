import { Environment } from '@common/enums';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { lastValueFrom, map } from 'rxjs';

export interface NIDVerificationResponse {
  name: string;
  nameEn: string;
  father: string;
  mother: string;
  gender: string;
  profession: string;
  spouse: string;
  dob: string;
  permanentAddress: string;
  presentAddress: string;
  nationalId: string;
  oldNationalId: string;
  photo: string;
}
const demo: NIDVerificationResponse = {
  name: 'ডেমো',
  nameEn: 'Demo',
  father: 'Demo father',
  mother: 'Demo mother',
  gender: 'male',
  profession: 'ছাত্র/ছাত্রী',
  spouse: 'Demo spouse',
  dob: '01/01/1999',
  permanentAddress: 'Loop freight ltd.',
  presentAddress: 'Loop freight ltd.',
  nationalId: '1234567890',
  oldNationalId: '12345678901112121',
  photo: 'https://st2.depositphotos.com/1186248/5903/i/450/depositphotos_59038425-stock-photo-demo.jpg',
};
@Injectable()
export class NidVerificationService {
  private porichoyKey: string;
  private porichoyBaseUrl: string;
  constructor(private config: ConfigService, private httpService: HttpService) {
    this.porichoyKey = this.config.get('porichoyKey');
    this.porichoyBaseUrl = this.config.get('porichoyBaseUrl');
  }

  public async verify(
    fullName: string,
    nid: string,
    dob: Date,
  ): Promise<NIDVerificationResponse> {
    let response = {} as NIDVerificationResponse;
    if (this.config.get('nodeEnv') !== Environment.PRODUCTION) return demo;
    const headers = {
      'Content-type': 'application/json',
      'x-api-key': this.porichoyKey,
    };
    try {
      const observable = this.httpService
        .post(
          this.porichoyBaseUrl,
          {
            national_id: nid,
            person_dob: moment(dob).format('YYYY-MM-DD'),
            person_fullname: fullName,
            match_name: true,
          },
          { headers },
        )
        .pipe(map((resp) => resp.data));
      const data = await lastValueFrom(observable);
      if (data.passKyc === 'yes') {
        if (
          data.voter.nameEn.trim().toLowerCase() !==
          fullName.trim().toLowerCase()
        )
          throw new BadRequestException(
            'NID verification failed. FullName should be as per NID.',
          );
        response.name = data.voter.name;
        response.nameEn = data.voter.nameEn;
        response.father = data.voter.father;
        response.mother = data.voter.mother;
        response.gender = data.voter.gender;
        response.profession = data.voter.profession;
        response.spouse = data.voter.spouse;
        response.dob = data.voter.dob;
        response.permanentAddress = data.voter.permanentAddress;
        response.presentAddress = data.voter.presentAddress;
        response.nationalId = data.voter.nationalId;
        response.oldNationalId = data.voter.oldNationalId;
        response.photo = data.voter.photo;
        return response;
      } else
        throw new BadRequestException(
          'NID verification failed. FullName, DOB should be as per NID.',
        );
    } catch (ex) {
      throw new HttpException({ message: ex.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
