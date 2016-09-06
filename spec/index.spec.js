import chai from "chai";
import sinon from "sinon";
import dirtyChai from "dirty-chai";
import sinonChai from "sinon-chai";
import "sinon-as-promised";
import jQueryFactory from "jquery";
import { jsdom } from "jsdom";
import mockjaxFactory from "jquery-mockjax";
import mayjaxFactory from "../src";
require( "chai" ).should();
chai.use( dirtyChai );
chai.use( sinonChai );

const document = jsdom().defaultView;
const window = document.window;

describe( "mayjax", () => {
	let $, jquery;
	beforeEach( function() {
		this.clock = sinon.useFakeTimers(); // eslint-disable-line no-invalid-this
		jquery = jQueryFactory( window );
		mockjaxFactory( jquery, window );
		sinon.spy( jquery, "ajax" );
		$ = mayjaxFactory( jquery );
	} );
	afterEach( function() {
		this.clock.restore(); // eslint-disable-line no-invalid-this
		jquery.ajax.restore();
	} );
	describe( "when it's not a GET request", () => {
		it( "should throw an exception", () => {
			( function() {
				$.mayjax( { method: "POST" } );
			} ).should.throw( /mayjax only works on GET requests/ );
		} );
	} );
	describe( "when it's a GET request", () => {
		describe( "and it's a lone request", () => {
			beforeEach( () => {
				jquery.mockjax( {
					url: "/single/get/request",
					responseTime: 150,
					responseText: "Your response, yo"
				} );
				$.mayjax( {
					url: "/single/get/request",
					method: "GET"
				} );
			} );
			it( "should create and remove a cache entry", function() {
				const cacheKey = JSON.stringify( {
					url: "/single/get/request",
					method: "GET"
				} );
				$.mayjax.cache.should.have.property( cacheKey );
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				$.mayjax.cache.should.not.have.property( cacheKey );
			} );
			it( "should call through to ajax once", function() {
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				return jquery.ajax.should.be.calledOnce
					.and.calledWithMatch( {
						url: "/single/get/request",
						method: "GET"
					} );
			} );
		} );
		describe( "when two non-overlapping requests occur", () => {
			beforeEach( () => {
				jquery.mockjax( {
					url: "/two/non-overlapping/requests/1",
					responseTime: 150,
					responseText: "Your response, yo"
				} );
				jquery.mockjax( {
					url: "/two/non-overlapping/requests/2",
					responseTime: 175,
					responseText: "Your response, yo"
				} );
				$.mayjax( {
					url: "/two/non-overlapping/requests/1",
					method: "GET"
				} );
				$.mayjax( {
					url: "/two/non-overlapping/requests/2",
					method: "GET"
				} );
			} );
			it( "should create and remove cache entries in correct order", function() {
				const cacheKey1 = JSON.stringify( {
					url: "/two/non-overlapping/requests/1",
					method: "GET"
				} );
				const cacheKey2 = JSON.stringify( {
					url: "/two/non-overlapping/requests/2",
					method: "GET"
				} );
				$.mayjax.cache.should.have.property( cacheKey1 );
				$.mayjax.cache.should.have.property( cacheKey2 );
				this.clock.tick( 160 ); // eslint-disable-line no-invalid-this
				$.mayjax.cache.should.not.have.property( cacheKey1 );
				$.mayjax.cache.should.have.property( cacheKey2 );
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				$.mayjax.cache.should.not.have.property( cacheKey2 );
			} );
			it( "should call out to ajax once for each request", function() {
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				return jquery.ajax.should.be.calledTwice
					.and.calledWithMatch( {
						url: "/two/non-overlapping/requests/1",
						method: "GET"
					} ).and.calledWithMatch( {
						url: "/two/non-overlapping/requests/2",
						method: "GET"
					} );
			} );
		} );
		describe( "when duplicate requests overlap", () => {
			beforeEach( () => {
				jquery.mockjax( {
					url: "/two/overlapping/request/1",
					responseTime: 150,
					responseText: "Your response, yo"
				} );
				jquery.mockjax( {
					url: "/two/overlapping/request/2",
					responseTime: 175,
					responseText: "Your response, yo"
				} );
				// THREE calls for request 1
				$.mayjax( {
					url: "/two/overlapping/request/1",
					method: "GET"
				} );
				$.mayjax( {
					url: "/two/overlapping/request/1",
					method: "GET"
				} );
				$.mayjax( {
					url: "/two/overlapping/request/1",
					method: "GET"
				} );
				// TWO calls for request 2
				$.mayjax( {
					url: "/two/overlapping/request/2",
					method: "GET"
				} );
				$.mayjax( {
					url: "/two/overlapping/request/2",
					method: "GET"
				} );
			} );
			it( "should create and remove cache entries in correct order", function() {
				const cacheKey1 = JSON.stringify( {
					url: "/two/overlapping/request/1",
					method: "GET"
				} );
				const cacheKey2 = JSON.stringify( {
					url: "/two/overlapping/request/2",
					method: "GET"
				} );
				$.mayjax.cache.should.have.property( cacheKey1 );
				$.mayjax.cache.should.have.property( cacheKey2 );
				this.clock.tick( 160 ); // eslint-disable-line no-invalid-this
				$.mayjax.cache.should.not.have.property( cacheKey1 );
				$.mayjax.cache.should.have.property( cacheKey2 );
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				$.mayjax.cache.should.not.have.property( cacheKey2 );
			} );
			it( "should call out to ajax once for each distinct simultaneous request", function() {
				this.clock.tick( 200 ); // eslint-disable-line no-invalid-this
				return jquery.ajax.should.be.calledTwice
					.and.calledWithMatch( {
						url: "/two/overlapping/request/1",
						method: "GET"
					} ).and.calledWithMatch( {
						url: "/two/overlapping/request/2",
						method: "GET"
					} );
			} );
		} );
	} );
} );
