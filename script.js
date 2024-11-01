
jQuery(document).ready( function() {
var el = jQuery( '.downloadable_files table tfoot' ).find('th');
el.attr( 'colspan' , '3' );
el.after( '<th colspan="2"><a href="#" class="button button-primary bulk-upload">Bulk Upload</a></th>' );
});

// // Uploading files.
var downloadable_file_frame;
$( document.body ).on( 'click', '.bulk-upload', function( event ) {

  var $el = $( this );


  event.preventDefault();

  // If the media frame already exists, reopen it.
  if ( downloadable_file_frame ) {
    downloadable_file_frame.open();
    return;
  }

  var downloadable_file_states = [
    // Main states.
    new wp.media.controller.Library({
      library:   wp.media.query(),
      multiple:  true,
      title:     $el.data('choose'),
      priority:  20,
      filterable: 'uploaded'
    })
  ];

  // Create the media frame.
  downloadable_file_frame = wp.media.frames.downloadable_file = wp.media({
    // Set the title of the modal.
    title: $el.data('choose'),
    library: {
      type: ''
    },
    button: {
      text: $el.data('update')
    },
    multiple: true,
    states: downloadable_file_states
  });

  // When an image is selected, run a callback.
  downloadable_file_frame.on( 'select', function() {
    var file_path = '';
    var selection = downloadable_file_frame.state().get( 'selection' );

    selection.map( function( attachment ) {
      attachment = attachment.toJSON();
      if ( attachment.url ) {
        file_path = attachment.url;
        file_name = attachment.filename;
      }

      var row = '<tr><td class="sort"></td><td class="file_name"><input type="text" class="input_text" placeholder="File name" name="_wc_file_names[]" value="'+file_name+'" /><input type="hidden" name="_wc_file_hashes[]" value="" /></td><td class="file_url"><input type="text" class="input_text" placeholder="http://" name="_wc_file_urls[]" value="'+file_path+'" /></td><td class="file_url_choose" width="1%"><a href="#" class="button upload_file_button" data-choose="Choose file" data-update="Insert file URL">Choose file</a></td><td width="1%"><a href="#" class="delete">Delete</a></td></tr>';

      $(".downloadable_files .ui-sortable").append(row);
      $(".downloadable_files .ui-sortable").sortable('refresh')

    });

  });

  // Set post to 0 and set our custom type.
  downloadable_file_frame.on( 'ready', function() {
    downloadable_file_frame.uploader.options.uploader.params = {
      type: 'downloadable_product'
    };
  });

  // Finally, open the modal.
  downloadable_file_frame.open();
});
