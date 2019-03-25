package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
)

const (
	URI        = "bolt://neo4j:neo4j@localhost:7687"
	CreateNode = "CREATE (n:NODE {foo: {foo}, bar: {bar}})"
	GetNode    = "MATCH p=()-->() RETURN p LIMIT 25"
)

func greet(w http.ResponseWriter, r *http.Request) {

	st := prepareSatement(GetNode, con)
	rows := queryStatement(st)
	consumeRows(rows, st)
	fmt.Fprintf(w, "Hello World! %s", time.Now())
}

var con bolt.Conn

func main() {
	con = createConnection()
	//defer con.Close()

	/* 	st := prepareSatement(CreateNode, con)
	   	executeStatement(st)
	*/

	http.HandleFunc("/", greet)
	http.ListenAndServe(":8080", nil)
}

func createConnection() bolt.Conn {
	driver := bolt.NewDriver()
	con, err := driver.OpenNeo(URI)
	if err != nil {
		log.Println("Erreur de connection neo4j")
	}
	return con
}
func prepareSatement(query string, con bolt.Conn) bolt.Stmt {
	st, err := con.PrepareNeo(query)
	handleError(err)
	return st
}
func executeStatement(st bolt.Stmt) {
	result, err := st.ExecNeo(map[string]interface{}{"foo": 1, "bar": 2.2})
	handleError(err)
	numResult, err := result.RowsAffected()
	handleError(err)
	fmt.Printf("CREATED ROWS: %d\n", numResult) // CREATED ROWS: 1

	// Closing the statment will also close the rows
	st.Close()
}
func handleError(err error) {
	if err != nil {
		panic(err)
	}
}
func queryStatement(st bolt.Stmt) bolt.Rows {
	// Even once I get the rows, if I do not consume them and close the
	// rows, Neo will discard and not send the data
	rows, err := st.QueryNeo(nil)
	handleError(err)
	return rows
}
func consumeRows(rows bolt.Rows, st bolt.Stmt) {
	// This interface allows you to consume rows one-by-one, as they
	// come off the bolt stream. This is more efficient especially
	// if you're only looking for a particular row/set of rows, as
	// you don't need to load up the entire dataset into memory
	data, _, err := rows.NextNeo()
	handleError(err)

	// This query only returns 1 row, so once it's done, it will return
	// the metadata associated with the query completion, along with
	// io.EOF as the error
	_, _, err = rows.NextNeo()
	handleError(err)
	fmt.Printf("COLUMNS: %#v\n", rows.Metadata()["fields"].([]interface{})) // COLUMNS: n.foo,n.bar
	fmt.Printf("FIELDS: %d %f\n", data[0].(int64), data[1].(float64))       // FIELDS: 1 2.2

	st.Close()
}
