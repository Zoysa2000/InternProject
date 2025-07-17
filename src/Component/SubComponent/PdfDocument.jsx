import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica"
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  section: {
    marginBottom: 12
  },
  label: {
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  table: {
    marginTop: 10,
    borderTop: "1pt solid #000",
    borderBottom: "1pt solid #000"
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 6,
    borderBottom: "1pt solid #000"
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottom: "0.5pt solid #ccc"
  },
  col1: { width: "50%" },
  col2: { width: "50%" }
});

// Helper to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) || dateStr.startsWith("0001")
    ? "-"
    : date.toLocaleDateString();
};

const PdfDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Employee Details</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Employee ID:</Text>
            <Text>{data.empId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text>{data.firstName} {data.lastName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text>{data.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text>{data.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Department:</Text>
            <Text>{data.department}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Position:</Text>
            <Text>{data.position}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Age:</Text>
            <Text>{data.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of Join:</Text>
            <Text>{formatDate(data.dateOfJoin)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Terms Accepted:</Text>
            <Text>{data.termsAccepted ? "Yes" : "No"}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 14, marginTop: 20, fontWeight: "bold" }}>
          Contributions
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Date</Text>
            <Text style={styles.col2}>Amount (LKR)</Text>
          </View>
          {data.contributions && data.contributions.length > 0 ? (
            data.contributions.map((c, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.col1}>{formatDate(c.contributionDate)}</Text>
                <Text style={styles.col2}>
                  {c.contributionAmount.toLocaleString("en-LK", {
                    style: "currency",
                    currency: "LKR",
                    minimumFractionDigits: 2
                  })}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={styles.col1}>No contributions</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;



