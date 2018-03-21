function escape(v1) {
	var v2 = v1.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return v2;
}
$.response.contentType = "text/html";
try {
	var conn = $.db.getConnection();
	var filename = $.request.parameters.get("file_name");
	var pstmtTime = conn.prepareStatement("select UTCTOLOCAL(CURRENT_UTCTIMESTAMP,'EST') from dummy");
	var rs = pstmtTime.executeQuery();
	var batchTimestamp;
	if (rs.next()) {
		batchTimestamp = rs.getTimestamp(1);
	}
	var batchId = filename + "_" + batchTimestamp;

	var pstmt = conn.prepareStatement(
		"insert into GBI_006.\"gbi-student-006.UCR.models::property_test\" (YEARS,POPULATION,PROPERTY_CRM_TTL,BURG,LARCENY_THF,MTR_VEH_THF,PROPERTY_CRM_TTL_RATE,BURG_RATE,LARCENY_THF_RATE,MTR_VEH_THF_RATE,STATE_ABBR) values(?,?,?,?,?,?,?,?,?,?,?)"
	);

	if ($.request.entities.length > 0) {
		var file_body = $.request.entities[0].body.asString();
		var allTextLines = file_body.split(/\r\n|\n/);
		var lines;
		var entries;
		var col;
		pstmt.setBatchSize(allTextLines.length - 1);
		for (lines = 1; lines < allTextLines.length; lines++) {
			entries = allTextLines[lines].split(',');

			pstmt.setString(1, entries[0]);
			pstmt.setString(2, entries[1]);
			pstmt.setString(3, entries[2]);
			pstmt.setString(4, entries[3]);
			pstmt.setString(5, entries[4]);
			pstmt.setString(6, entries[5]);
			pstmt.setString(7, entries[6]);
			pstmt.setString(8, entries[7]);
			pstmt.setString(9, entries[8]);
			pstmt.setString(10, entries[9]);
			pstmt.setString(11, entries[10]);
			pstmt.addBatch();
		}
	}
	pstmt.executeBatch();

	pstmt.close();
	conn.commit();
	conn.close();
	$.response.setBody("File Upload successful!");
} catch (err) {
	if (pstmt !== null) {
		pstmt.close();
	}
	if (conn !== null) {
		conn.close();
	}
	$.response.setBody(err.message);
}