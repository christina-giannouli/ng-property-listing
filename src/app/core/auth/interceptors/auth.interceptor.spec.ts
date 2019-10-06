import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { LocalStorageService } from '../../services/localstorage.service';

describe('Interceptor: AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let http: HttpClient;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                JwtModule.forRoot({
                    config: {
                        tokenGetter: () => {
                            return '';
                        },
                    },
                }),
            ],
            providers: [
                LocalStorageService,
                JwtHelperService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        });

        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        http = injector.get(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // Authorization Header
    it(`intercept(): should set Authorization header which includes 'Bearer'
    on each request`, () => {
        http.get('/data').subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const httpRequest = httpMock.expectOne(
            (request) =>
                request.headers.has('Authorization') &&
                request.headers.get('Authorization').includes('Bearer'),
        );

        httpRequest.flush({ hello: 'world' });
    });
});
