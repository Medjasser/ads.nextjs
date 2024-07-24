export class Vertical {
  public vertical_id: string;
  public vertical_repository_abbreviat: string;
  public bu_abbreviat: string;
  public ISO3: string;

  constructor(
    vertical_id: string,
    vertical_repository_abbreviat: string,
    bu_abbreviat: string,
    ISO3: string
  ) {
    this.vertical_id = vertical_id;
    this.vertical_repository_abbreviat = vertical_repository_abbreviat;
    this.bu_abbreviat = bu_abbreviat;
    this.ISO3 = ISO3;
  }

  get getVerticalRepositoryAbbreviation(): string {
    return this.vertical_repository_abbreviat;
  }

  get getBuAbbreviation(): string {
    return this.bu_abbreviat;
  }

  get getISO3(): string {
    return this.ISO3;
  }

  public get getId(): string {
    return this.vertical_id;
  }

  get codifiedName(): string {
    return `${this.ISO3}-${this.bu_abbreviat}-${this.vertical_repository_abbreviat}`;
  }
}
