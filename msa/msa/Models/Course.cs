using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace msa.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public int Credits { get; set; }
        public ICollection<String> Assessments { get; set; }
        [JsonIgnore]
        public virtual ICollection<Enrollment> Enrollments { get; set; }

    }
}