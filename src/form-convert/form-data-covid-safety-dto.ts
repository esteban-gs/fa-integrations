export class FormDataCovidSafetyDto {
  public vacccineDocsVerified?: string;
  public verifierInitials?: string;
  public verifiedOn?: Date;
  public firstName: string;
  public lastName: string;
  public email: string;
  public cell: string;
  public onsiteRole: string;
  public startingDateOrEventName: string;
  public whichVaccine: string;
  public dateOfFirstDose: Date;
  public dateOfSecondDose?: Date;
  public proofMethod: string;
  public contactWithInfectedInLastTwoWeeks?: string;
  public experiencedSymptomsInLastTwoWeeks?: string;
  public willingToComplyWithAnyAndAllSafetyAndMaskMandatesSetForthByTheEvent: string;
  public attest: boolean;
  public responseUrl: string;
  public referer: string;
  public unprotedtedFileList: string;
}
