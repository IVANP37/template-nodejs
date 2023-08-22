const { Router } = require("express");
const router = new Router();
const dbConnection = require("../../config/dbConnection");
const AWS = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const multerS3 = require("multer-s3");
// AWS
// Configure AWS SDK
const s3 = new S3Client({
  accessKeyId: "AKIAZXAXHJFVSYE2JVAA",
  secretAccessKey: "eM+RcGCQ0GzTxNHiwNJMO1MT/drwab1tT5smssOB",
  region: "us-east-1",
});

const DEFAULT_RESULTS_PER_PAGE = 16; 
// Your secret key for JWT 
const secretKey = 'CONNEXON_JOUNAL23';

// Configure multer middleware
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "connexon",
    acl: "public-read", // set ACL permissions for the uploaded file
    key: function (req, file, cb) {
      cb(null, file.originalname); // use original file name as the key in S3
    },
  }),
});
// Handle file upload route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  // File uploaded successfully
  return res.status(200).json({ message: "File uploaded successfully" });
});

/// Authors
router.get("/authors", (req, res) => {
  const sql = `select * from Authors`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});
router.get("/authors/:id", (req, res) => {
  const simple_id = parseInt(req.params.id);
  const sql = `select * from Authors where id = ${simple_id}`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});
router.post("/authors", async (req, res) => {
  var postData = req.body;
  dbConnection.connection.query(
    "INSERT INTO Authors SET ?",
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.put("/authors/:id", async (req, res) => {
  const id = req.params.id;
  var postData = req.body;
  dbConnection.connection.query(
    "UPDATE Authors SET ? WHERE id =" + id,
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});

router.delete("/authors/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Authors WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Category Eliminated");
    }
  });
});

/// Format
router.get("/format", (req, res) => {
  const sql = "Select * from Format";
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});
router.get("/format/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "Select * FROM Format WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Category Eliminated");
    }
  });
});
router.post("/format", async (req, res) => {
  var postData = req.body;
  dbConnection.connection.query(
    "INSERT INTO Format SET ?",
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.put("/format/:id", async (req, res) => {
  const id = req.params.id;
  var postData = req.body;
  dbConnection.connection.query(
    "UPDATE Format SET ? WHERE id =" + id,
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});

router.delete("/format/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Format WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Category Eliminated");
    }
  });
});

// All languaje
router.get("/language", (req, res) => {
  const sql = `select * from Language`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});
///Permissions
router.get("/permission", (req, res) => {
  const sql = `select * from Permissions`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});

///Status

router.get("/status", (req, res) => {
  const sql = `select * from Status`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});

///All Categories
router.get("/category/:id", (req, res) => {
  const simple_id = parseInt(req.params.id);
  const sql = `select * from Categories where id = ${simple_id}`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});

router.post("/categories", async (req, res) => {
  var postData = req.body;
  dbConnection.connection.query(
    "INSERT INTO Categories SET ?",
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.put("/categories/:id", async (req, res) => {
  const id = req.params.id;
  var postData = req.body;
  dbConnection.connection.query(
    "UPDATE Categories SET ? WHERE id =" + id,
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});

router.delete("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Categories WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Category Eliminated");
    }
  });
});

router.get("/categories", (req, res) => {
  const sql = `select * from Categories`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});

/////////All POST

router.post("/posts", async (req, res) => {
  var postData = req.body;
  postData.creationDate = new Date();
  postData.tags = JSON.stringify(Object.assign({}, postData.tags));
  dbConnection.connection.query(
    "INSERT INTO Post SET ?",
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  var postData = req.body;
  postData.creationDate = new Date();
  postData.tags = JSON.stringify(Object.assign({}, postData.tags));
  dbConnection.connection.query(
    "UPDATE Post SET ? WHERE id =" + id,
    postData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Post WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Post Eliminated");
    }
  });
});
router.get("/posts", (req, res) => {
  const sql = `select * from Post`;
  dbConnection.connection.query(sql, (error, results) => {
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send(results);
    }
  });
});
router.get("/post/:id", (req, res) => {
  const simple_id = parseInt(req.params.id);
  const sql = `select * from Post where id = ${simple_id}`;
  dbConnection.connection.query(sql, (error, results) => {
    if (!error) {
      if (results.length > 0) {
        const data = results;
        return res.status(200).json({ data });
      } else {
        return res.send("Sin resultados");
      }
    } else {
      res.send({ error: error });
    }
  });
});

router.get("/posts/search/", (req, res) => {
  const { q, category, page, perPage } = req.query;

  // Set default values for page and perPage
  const pageNumber = parseInt(page) || 1;
  const resultsPerPage = parseInt(perPage) || 10;

  let query = 'SELECT * FROM Post WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) AS total FROM Post WHERE 1=1';
  const params = [];

  if (q) {
    query += ' AND title LIKE ?';
    countQuery += ' AND title LIKE ?';
    params.push(`%${q}%`);
  }

  if (category) {
    query += ' AND category LIKE ?';
    countQuery += ' AND category LIKE ?';
    params.push(`%${category}%`);
  }

  // Calculate the OFFSET value based on the page number and results per page
  const offset = (pageNumber - 1) * resultsPerPage;

  // Add LIMIT and OFFSET to the query
  query += ' LIMIT ? OFFSET ?';
  params.push(resultsPerPage, offset);

  dbConnection.connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    dbConnection.connection.query(countQuery, params, (err, totalCountResult) => {
      if (err) {
        console.error('Error executing MySQL query: ', err);
        res.status(500).json({ error: 'An error occurred' });
        return;
      }

      // Extract the total count from the result
      const total = totalCountResult[0].total;
      const totalPages = Math.ceil(total / resultsPerPage);
      res.json({
        results,
        page: pageNumber,
        perPage: resultsPerPage,
        totalPages,
      });
    });
  });
});


// Endpoint for fetching posts with pagination
router.get('/posts/pagination/', (req, res) => {
  const { q, category, page, perPage } = req.query;

  // Set default values for page and perPage
  const pageNumber = parseInt(page) || 1;
  const resultsPerPage = parseInt(perPage) || 10;

  let query = 'SELECT *, (SELECT COUNT(*) FROM Post WHERE 1=1';
  const countParams = [];

  if (category) {
    query += ' AND category LIKE ?';
    countParams.push(`%${category}%`);
  }

  query += ') AS total FROM Post WHERE 1=1';

  const params = [...countParams];

  if (category) {
    query += ' AND category LIKE ?';
    params.push(`%${category}%`);
  }

  // Calculate the OFFSET value based on the page number and results per page
  const offset = (pageNumber - 1) * resultsPerPage;

  // Add LIMIT and OFFSET to the query
  query += ' LIMIT ? OFFSET ?';
  params.push(resultsPerPage, offset);

  dbConnection.connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    // Extract the total count from the result
    const total = results[0].total;
    const totalPages = Math.ceil(total / resultsPerPage);

    res.json({
      results,
      page: pageNumber,
      perPage: resultsPerPage,
      totalPages,
    });
  });
});

/// USERS

router.post("/users", async (req, res) => {
  var userData = req.body;
  userData.registration_date = new Date();
  userData.password = Buffer.from(userData.password).toString("base64");
  dbConnection.connection.query(
    "INSERT INTO Users SET ?",
    userData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  var userData = req.body;
  userData.registration_date = new Date();
  userData.password = Buffer.from(userData.password).toString("base64");
  dbConnection.connection.query(
    "UPDATE Users SET ? WHERE id =" + id,
    userData,
    (error, results) => {
      console.log(results);
      if (error) {
        res.send({ error: error });
      } else {
        res.status(200).send(results.id);
      }
    }
  );
});
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Users WHERE id = ?";
  dbConnection.connection.query(sql, id, (error, results) => {
    console.log(results);
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send("Post Eliminated");
    }
  });
});
router.get("/users", (req, res) => {
  const sql = `select * from Users`;
  dbConnection.connection.query(sql, (error, results) => {
    if (error) {
      res.send({ error: error });
    } else {
      res.status(200).send(results);
    }
  });
});
router.get("/users/:id", (req, res) => {
  const simple_id = parseInt(req.params.id);
  const sql = `select username, email, password, permission_id from Users where id = ${simple_id}`;
  const values = [simple_id];
  // Execute the query
  dbConnection.connection.query(sql, values, (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      const data = results;
      const decryptedPassword = Buffer.from(data.password, "base64").toString();

      return res.status(200).json({ ...(data.password = decryptedPassword) });
    } else {
      res.status(404).send("User not found");
    }
  });
});


//////LOGIN PROCESS////////
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Step 4: Verify user's credentials against the database
    const user = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const storedPassword = user.rows[0].password; // Assuming you have stored the password hash in the 'password' column

    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Step 3: Generate a JWT containing the user data
    const userData = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      registration_date: user.rows[0].registration_date,
      permission_id: user.rows[0].permission_id,
    };

    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

    // Step 5: Send the JWT as a response
    return res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
