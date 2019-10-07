import { CompanyDetail } from 'src/app/model';

/**
 * Interface para armazenamento dos dados do
 * resultado da pesquisa de detalhes de uma empresa.
 */

export interface ListCompanyDetailsResponse {
    companyDetails: CompanyDetail[];
}