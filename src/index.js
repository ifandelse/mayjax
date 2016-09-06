const cache = {};

export default function( $ ) {
	$.mayjax = function mayjax( settings ) {
		const { method } = settings;
		if ( method.toUpperCase() !== "GET" ) {
			throw new Error( "mayjax only works on GET requests" );
		}
		const key = JSON.stringify( settings );
		if ( !cache[ key ] ) {
			cache[ key ] = $.ajax( settings );
			cache[ key ].always( () => {
				delete cache[ key ];
			} );
		}

		return cache[ key ];
	};

	$.mayjax.cache = cache;

	return $;
}
