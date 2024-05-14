export class SeverityConstants {
    public static severities: any[] = [
        {typeValue: 'unknown', class: 'alert alert-secondary'},
        {typeValue: 'minor', class: 'alert alert-primary'},
        {typeValue: 'moderate', class: 'alert alert-warning'},
        {typeValue: 'severe', class: 'alert alert-danger'},
        {typeValue: 'extreme', class: 'alert alert-danger'}
    ];

    public static getSeverityClass(severity: string): string {
        return this.severities.find(s => s.typeValue === severity.toLowerCase()).class;
    }
}
